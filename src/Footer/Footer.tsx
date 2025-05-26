import { IconAnchor } from '@tabler/icons-react'
import React from 'react'

function Footer() {
    return (
        <div className='mt-20 pb-5 '>
            <div>
                <div className="flex gap-1 items-center text-bright-sun-400 ">
                    <IconAnchor className="h-7 w-7  " stroke={2.5} />
                    <div className=" text-xl font-semibold "> JobHook</div>
                </div>
            </div>
        </div>
    )
}

export default Footer