import { useEffect, useState } from 'react';
import { talents } from '../../Data/TalentData'
import Sort from '../FindJobs/Sort'
import TalentCard from './TalentCard'
import { getAllProfiles } from '../../Services/ProfileService';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../../Slices/FilterSlice';

function Talents() {
    const dispatch = useDispatch();
    const [talents, setTalents] = useState<any>([]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);
    const [filteredTalents, setFilteredTalents] = useState<any>([]);
    useEffect(() => {
        dispatch(resetFilter());
        getAllProfiles().then((res: any) => {
            console.log("Talents Data:", res);
            setTalents(res);
        }).catch((err: any) => {
            console.error("Error fetching talents:", err);
        });
    }, [])

    useEffect(() => {

       
         if (sort == "Experience: Low to High") {
            setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp));
        }
        else if (sort == "Experience: High to Low") {
            setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp));
        }


    }, [sort])

    useEffect(() => {
        let filtereTalent = talents;

        console.log("Filter state:", filter);
        if (filter.name) filtereTalent = filtereTalent?.filter((talent: any) => talent?.name?.toLowerCase().includes(filter.name.toLowerCase()));
        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filtereTalent = filtereTalent?.filter((talent: any) => filter["Job Title"]?.some((title: any) =>
                talent?.jobTitle.toLowerCase().includes(title.toLowerCase())));
        }

        // Same for location 

        if (filter.Location && filter.Location.length > 0) {
            filtereTalent = filtereTalent.filter((talent: any) => filter.Location?.some((location: any) =>
                talent.location.toLowerCase().includes(location.toLowerCase())));
        }

        // Same for skills

        if (filter.Skills && filter.Skills.length > 0) {
            filtereTalent = filtereTalent.filter((talent: any) => filter.Skills?.some((skill: any) =>
                talent.skills?.some((talentSkill: any) => talentSkill.toLowerCase().includes(skill.toLowerCase()))));
        }

        // Same for experience
        if (filter.exp && filter.exp.length > 0) {
            filtereTalent = filtereTalent.filter((talent: any) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]);
        }

        setFilteredTalents(filtereTalent);

    }, [filter, talents]);

    return (
        <div className='p-5 '>

            <div className='flex justify-between '>
                <div className='text-2xl font-semibold ' >Talents</div>
                <Sort />
            </div>

            <div className='mt-10 flex flex-wrap gap-5 justify-evenly '>
                {
                    filteredTalents?.length ? filteredTalents.map((talent: any, index: any) => <TalentCard key={index} {...talent} />) :
                        <div className='text-mine-shaft-300 text-lg font-semibold '>
                            No Talents Found
                        </div>
                }
            </div>

        </div>

    )
}

export default Talents