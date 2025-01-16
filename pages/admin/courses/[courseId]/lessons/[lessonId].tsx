import type { NextPage, GetServerSideProps } from 'next'
import { prisma } from 'utils/prisma'
import { useSession } from "next-auth/react"
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import type { Session } from 'next-auth'
import type { Lesson, Video } from '@prisma/client'
import { useRouter } from 'next/router'
import { SubmitHandler } from "react-hook-form";
import MuxPlayer from "@mux/mux-player-react/lazy";
import LessonForm, { Inputs } from 'components/forms/LessonForm'
import Button from 'components/Button'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query'

type AdminLessonEditPageProps = {
  session: Session;
  lesson: Lesson & {
    video: Video | null;
  }
}

const AdminLessonEdit: NextPage<AdminLessonEditPageProps> = ({ lesson }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const updateLesson = (data: Inputs) => {
    return fetch(`/api/lessons/${lesson.id}`, {
      method: 'PUT', body: JSON.stringify(data)
    }).then(res => res.json())
  }

  const deleteLesson = () => {
    return fetch(`/api/lessons/${lesson.id}`, { method: 'DELETE' })
  }

  const updateMutation = useMutation({
    mutationFn: updateLesson,
    onSuccess: () => {
      toast.success('Clase actualizada correctamente')
    },
    onError: (error) => {
      console.error(error)
      toast.error('Algo salió mal')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      router.push(`/admin/courses/${lesson.courseId}`)
      toast.success('Clase eliminada correctamente')
    },
    onError: (error) => {
      console.error(error)
      toast.error('Algo salió mal')
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    updateMutation.mutate(data);
  };

  if (session) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {lesson.video?.status === "ready" && lesson.video.publicPlaybackId ? (
            <MuxPlayer
              className="mb-6 w-full aspect-video"
              streamType="on-demand"
              playbackId={lesson.video.publicPlaybackId}
              accentColor="#4491EF"
              metadata={{
                video_series: lesson.courseId,
                video_title: lesson.name,
                player_name: "Profe Web",
              }}
            />
          ) : (
            <div className="mb-6 w-full aspect-video bg-gray-200" />
          )}

          <Button
            intent="danger"
            onClick={async () => {
              const confirmation = await new Promise((resolve) => {
                toast((t) => (
                  <div className="flex flex-col items-start space-y-2">
                    <p className="text-center">Seguro que querés eliminar esta clase?</p>
                    <div className="flex space-x-4 justify-center w-full">
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                          resolve(true);
                          toast.dismiss(t.id);
                        }}
                      >
                        Confirmar
                      </button>
                      <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        onClick={() => {
                          resolve(false);
                          toast.dismiss(t.id);
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ));
              });

              if (confirmation) {
                deleteMutation.mutate();
              }
            }}
          >
            Eliminar clase
          </Button>
        </div>
        <div>
          <LessonForm onSubmit={onSubmit} lesson={lesson} isLoading={updateMutation.isPending} />
        </div>
      </div>
    )
  }
  return <p>Access Denied</p>
}

export default AdminLessonEdit

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const id = context?.params?.lessonId
  if (typeof id !== "string") { throw new Error('missing id') };

  const [lesson] = await prisma.lesson.findMany({
    where: {
      id: parseInt(id),
      course: {
        author: {
          id: session.user?.id
        }
      }
    },
    include: {
      video: true
    }
  })

  if (!lesson) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      session,
      lesson
    },
  }
}
