import { Button, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice1";
import NotiMenu from "./NotiMenu";

const Header = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);


    useEffect(() => {
        getProfile(user?.id).then((data: any) => {
            dispatch(setProfile(data));
        }).catch((error: any) => {
            console.log("Error while getting profile : ", error)
        })
    }, [user])
    return location.pathname !== "/signup" && location.pathname !== "/login" ? <div className="w-full text-white bg-mine-shaft-950 px-6 h-20 flex justify-between items-center   font-['poppins']  ">
        <div className="flex gap-1 items-center text-bright-sun-400 ">
            <IconAnchor className="h-8 w-8  " stroke={2.5} />
            <div className=" text-3xl font-semibold "> JobHook</div>
        </div>
        <div>
            {<NavLinks />}
        </div>
        {/* https://uicolors.app/generate/80becd this is best for the choosing ui colors */}
        <div className="flex gap-3 items-center">


            {user ? <ProfileMenu /> : <Link to="/login">
                <Button variant="subtle" color="brightSun.4" >Login</Button>
            </Link>}

            { user ? <NotiMenu/> : <></>}


            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full  " >
                <IconSettings stroke={1.5} />
            </div> */}
            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full  ">

                <Indicator color="brightSun.4" offset={6} size={8} processing>
                    <IconBell stroke={1.5} />
                </Indicator>

            </div> */}
        </div>
    </div> : <></>
}

export default Header;