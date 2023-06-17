import loader from "../public/loader.gif";
import Image from "next/image";

interface Props {}

export default function Loading(props: Props) {
  const {} = props;

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Image src={loader} alt="loader" />
    </div>
  );
}
