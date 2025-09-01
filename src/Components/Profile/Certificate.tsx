import { ActionIcon } from '@mantine/core'
import { IconPencil, IconPlus, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import CertiCard from './CertiCard'
import CertiInput from './CertiInput'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@mantine/hooks'

function Certificate() {
  const matches = useMediaQuery('(max-width: 475px)');
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  }

  return (
    <div className="px-3 ">
      <div className="text-2xl font-semibold mb-5 flex justify-between ">
        Certifications
        <div className="flex gap-2 ">
          <ActionIcon size={matches ?"md":"lg"} variant="subtle" color="brightSun.4" onClick={() => setAddCerti(true)} >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>

          <ActionIcon size={matches ?"md":"lg"} variant="subtle" color={edit ? "red.8" : "brightSun.4"} onClick={handleClick} >
            {edit ? (
              <IconX className=" h-4/5 w-4/5 " />) : (<IconPencil className="h-4/5 w-4/5" />)}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8 ">
        {profile?.certification?.map((certi: any, index: number) =>
          <CertiCard key={index} index={index} edit={edit} {...certi} />
        )}
        {
          addCerti && (
            <CertiInput
              setEdit={setAddCerti}
              add={true} // Indicate that this is for adding a new certificate
              certification={profile.certification} // Pass the existing certifications array
            />
          )
        }
      </div>
    </div>
  )
}

export default Certificate
