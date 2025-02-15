import { MdOutlineManageAccounts } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
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
            // { title: "Add New User", url: '/profile/management/add-user', description: "Official location of corporate headquarters", icon: <RiUserAddLine className="w-10 h-10 text-neutral-1200" /> },
            { title: "Users", url: '/profile/management/user-list', description: "Official location of corporate headquarters", icon: <FaUser className="w-10 h-10 text-neutral-1200" /> },
            // { title: "Add New Group", url: '/', description: "Official location of corporate headquarters", icon: <MdOutlineGroupAdd className="w-10 h-10 text-neutral-1200" /> },
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
        icon: <FaUserShield className="w-10 h-10 text-neutral-1200" />
    },

]