import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../../Slices/ProfileSlice1";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successNotification } from "../../Services/NotificationService";
import { getBase64 } from "../../Services/Utilities";


function Profile() {

  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const { hovered, ref } = useHover();
  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(',')[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Picture updated Successfully");
  }
 

  return (
    <div className=" w-4/5 mx-auto ">
      <div className="">
        <div className="relative">
          <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
          <div
            ref={ref}
            className="absolute flex items-center justify-center -bottom-1/3 left-3"
          >
            <Avatar
              className="!w-48 !h-48 border-l-mine-shaft-950 border-8 rounded-full"
              src={profile.picture ? `data:image/png;base64,${profile.picture}` :"/avatar.png"}
              alt="avatar"
            />
            {/* Conditionally render the overlay and icon based on the hovered state */}
            {hovered && (
              <>
                <Overlay
                  className="!rounded-full absolute inset-0"
                  color="#000"
                  backgroundOpacity={0.75}
                />
                <IconEdit className="absolute z-[300] !w-16 !h-16 text-white" />
                {/* FileInput should be the top-most element so it can be clicked */}
                <FileInput
                  onChange={handleFileChange}
                  className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full !w-full"
                  variant="transparent"
                  accept="image/png,image/jpeg"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="px-3 mt-24 ">

        <Info />

      </div>
      <Divider mx="xs" my="xl" />

      <About />

      <Divider mx="xs" my="xl" />

      <Skills />

      <Divider mx="xs" my="xl" />

      <Experience />

      <Divider mx="xs" my="xl" />
      <Certificate />
    </div>
  );
}

export default Profile;
