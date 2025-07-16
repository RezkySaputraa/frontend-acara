import { ReactNode } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const iconList: { [key: string]: ReactNode } = {
  success: <CiCircleCheck className="text-3xl text-success-300" />,
  error: <CiCircleRemove className="text-3xl text-danger-500" />,
};

interface PropTypes {
  type: string;
  message: string;
}

const Toaster = (props: PropTypes) => {
  const {type, message} = props
  return (
    <div
      className="fixed z-50 max-w-xs bg-white border border-gray-200 shadow-sm right-8 top-8 rounded-xl"
      role="alert"
      aria-labelledby="toater-label"
    >
      <div className="flex items-center gap-2 p-4">
        {iconList[type]}
        <p id="toater-label" className="text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toaster;