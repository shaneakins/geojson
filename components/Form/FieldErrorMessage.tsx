const style: React.CSSProperties = {
  marginTop: '4px',
  color: 'red',
  fontSize: '10pt',
}

type Props = { children?: React.ReactNode }

const ErrorMessage = ({ children }: Props) => {
  return <p style={style}>{children}</p>
}

export default ErrorMessage
