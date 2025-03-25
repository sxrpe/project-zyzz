import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4 justify-center">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-md text-sm font-medium ${
                                isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-md text-sm font-medium ${
                                isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-md text-sm font-medium ${
                                isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;