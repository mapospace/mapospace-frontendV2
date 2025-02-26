import { MdOutlineManageAccounts } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { GoPasskeyFill } from "react-icons/go";
export const sidebarMenuItems = [
    {
        title: "Details",
        items: [
            { title: "Information", url: '/profile/addresses', description: "Official location of corporate headquarters", icon: <RiUserAddLine className="w-10 h-10 text-neutral-1200" /> },

        ],
        description: "Official location of corporate headquarters",
        url: '/profile/addresses',
        icon: <BiSolidUserDetail className="w-10 h-10 text-neutral-1200" />
    },
    {
        title: "Management",
        items: [
            { title: "Users", url: '/profile/management/user-list', description: "Official location of corporate headquarters", icon: <FaUser className="w-10 h-10 text-neutral-1200" /> },
            { title: "Groups", url: '/profile/management/group-list', description: "Official location of corporate headquarters", icon: <FaUsers className="w-10 h-10 text-neutral-1200" /> },
        ],
        description: "Official location of corporate headquarters",
        url: '/profile/management',
        icon: <FaUserCog className="w-10 h-10 text-neutral-1200" />
    },
    {
        title: "Security",
        items: [
            { title: "API Key", url: '/profile/api-key', description: "Official location of corporate headquarters", icon: <RiUserAddLine className="w-10 h-10 text-neutral-1200" /> },

        ],
        description: "Official location of corporate headquarters",
        url: '/profile/api-key',
        icon: <GoPasskeyFill className="w-10 h-10 text-neutral-1200" />
    },
    {
        title: "Password",
        items: [
            { title: "Reset Password", url: '/profile/reset-password', description: "Change or reset your password for account security.", icon: <RiUserAddLine className="w-10 h-10 text-neutral-1200" /> },
        ],
        description: "Update and strengthen your account password.",
        url: '/profile/reset-password',
        icon: <FaUserShield className="w-10 h-10 text-neutral-1200" />
    }

]