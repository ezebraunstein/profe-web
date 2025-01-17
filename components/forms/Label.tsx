type Props = {
  htmlFor: string;
  children: React.ReactNode;
}

const Label = ({ htmlFor, children }: Props) => (
  <label className='font-semibold text-foreground mb-1' htmlFor={htmlFor}>{children}</label>
)

export default Label;