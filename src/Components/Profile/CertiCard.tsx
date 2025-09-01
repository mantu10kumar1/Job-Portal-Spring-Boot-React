import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeProfile } from "../../Slices/ProfileSlice1";
import { successNotification } from "../../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

function CertiCard(props: any) {
  const matches = useMediaQuery('(max-width: 475px)');
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let certis = [...profile.certification];
    certis.splice(props.index, 1);
    let updatedProfile = { ...profile, certification: certis };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate deleted Successfully");
  }
  return (
    <div className='flex justify-between sm-mx:flex-wrap '>
      <div className='flex gap-2 items-center '>
        <div className='p-2 bg-mine-shaft-800 rounded-md shrink-0 '>
          <img className=' h-7 ' src={`/Icons/${props.issuer}.png`} alt="ms" />
        </div>

        <div className='flex flex-col xs-mx:flex-wrap'>
          <div className='font-semibold xs-mx:text-sm ' >{props.name}</div>
          <div className='text-sm text-mine-shaft-300 xs-mx:text-sm '>{props.issuer}</div>

        </div>
      </div>
      <div className="flex  items-center gap-2">
        <div className="flex flex-col items-end sm-mx:flex-row sm-mx:gap-2  " >
          <div className='text-sm text-mine-shaft-300 xs-mx:text-sm '>{formatDate(props.issueDate)}</div>
          <div className='text-sm text-mine-shaft-300 xs-mx:text-sm'>{props.certificateId}</div>
        </div>
        {props.edit && <ActionIcon size={matches ?"md":"lg"} onClick={handleDelete} variant="subtle" color="red.8"> <IconTrash className="h-4/5 w-4/5" stroke={1.5} /> </ActionIcon>}
      </div>

    </div>

  )
}

export default CertiCard