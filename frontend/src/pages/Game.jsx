import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiHelper } from '../lib/apiHelper'
import { FaSearch } from 'react-icons/fa'

export default function Game() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [suggestions, setSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    async function getSuggestions(searchTerm) {
        const res = await apiHelper.dynamicSearch(searchTerm);
        if (res.error) {
            console.log(res.error);
            return;
        }
        setSuggestions(res);
    }
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSuggestions((prev) => [])
            return;
        };
        getSuggestions(searchTerm)
    }, [searchTerm])


    const getData = async () => {
        const res = await apiHelper.fetchGameData(id)
        if (res.error) {
            console.log(res.error)
            return
        }
        setData(res)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className=' flex w-full h-full min-h-screen px-6 py-6 flex-col'>
            <>
                <div className=' py-3 px-5 border border-slate-100 relative rounded-lg flex flex-row justify-start items-center w-full  h-fit gap-4' >
                    <FaSearch color='#ffffff' className=' w-8 h-8 ' />
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='GTA VI' className=' outline-none bg-transparent  flex w-full px-4 py-2 text-slate-100 text-2xl font-semibold' />
                </div>
                <div className=' relative mt-2'>
                    <div className=' z-30 absolute top-0 w-full h-fit rounded-lg overflow-clip'>
                        {suggestions.map((elem, ind) => {
                            return (
                                <Link to={`/games/${elem.id}`} key={`suggestion-${ind}`} >
                                    <div className={`py-2 px-5 bg-slate-50 hover:bg-zinc-900 text-zinc-950 hover:text-slate-50 transition-all ${ind === suggestions.length - 1 ? "" : " border-b border-zinc-400"}`} >
                                        <h2 className=' text-xl font-semibold '>{elem.name}</h2>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </>
            <div className=' flex flex-col py-6'>
                {JSON.stringify(data)}
            </div>
        </div>
    )
}
