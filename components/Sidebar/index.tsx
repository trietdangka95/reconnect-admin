import BaseSpinner from "../LoadingIndicator/BaseSpinner";
import ExpandButton from "../Icons/expand-menu.svg";
import CollapseButton from "../Icons/collapse-menu.svg";
import Image from "next/image";
interface Props {
  className?: string;
  isOpenSidebar: boolean;
  handleSidebar: (value: boolean) => void;
}
const Sidebar = ({ className, isOpenSidebar, handleSidebar }: Props) => {
  return (
    <aside className={`${className}`}>
      <div className="flex justify-center items-center">
        {isOpenSidebar && (
          <div>
            <Image
              alt="logo"
              src="/images/rehash-text.png"
              width="144"
              height="40"
            />
          </div>
        )}

        <button
          type="button"
          className={
            "rounded flex justify-center items-center w-6 h-6 bg-gray-400 hover:bg-blue-80 shadow p-1 focus:outline-none"
          }
          onClick={() => handleSidebar(!isOpenSidebar)}
        >
          <Image
            alt="expand"
            width={24}
            height={24}
            src={isOpenSidebar ? ExpandButton : CollapseButton}
            className="w-6 h-6 text-white"
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
