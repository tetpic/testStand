'use server'
interface Props {
  children: React.ReactNode
}

export default function P(props: Props) {

  return (<p>{props.children}</p>)
}