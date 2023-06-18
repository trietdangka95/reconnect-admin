interface Props {
  className?: string;
}
const HeaderPage = ({ className }: Props) => {
  return <header className={className}>Đây là Header</header>;
};

export default HeaderPage;
