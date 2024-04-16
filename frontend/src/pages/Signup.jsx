import React, { useEffect, useState } from 'react'
import { FaCross, FaPlusCircle } from 'react-icons/fa'
import { apiHelper } from '../lib/apiHelper'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const ogGenres = ["Casual", "Puzzle", "Card", "Educational", "Board Games", "Platformer", "Massively Multiplayer", "Fighting", "Arcade", "Family", "Action", "Shooter", "Sports", "Adventure", "RPG", "Indie", "Strategy", "Simulation", "Racing"]
    const [genres, setGenres] = useState(ogGenres)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [rank, setRank] = useState("")
    const [mode, setMode] = useState("signup")
    const [interestedGames, setInterestedGames] = useState([])
    const gameRanks = [
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Master",
        "Grandmaster",
        "Challenger"
    ];

    const [suggestions, setSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useNavigate()
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


    useEffect(() => {
        console.log(selectedGenres)
        setGenres((prev) => ogGenres.filter((elem) => !selectedGenres.includes(elem)))
        console.log(genres)
    }, [selectedGenres])

    async function handleSignup(e) {
        e.preventDefault();
        console.log({email, username, password, startTime, endTime, genre: selectedGenres, rank, interestedGames: interestedGames.map((elem) => elem.id)})
        // return;
        const [shours, sminutes] = startTime.split(":").map(Number);
        const [ehours, eminutes] = endTime.split(":").map(Number);

        const sdate = new Date();
        sdate.setHours(shours);
        sdate.setMinutes(sminutes);
        const edate = new Date();
        edate.setHours(ehours);
        edate.setMinutes(eminutes);
        const res = await apiHelper.signup({ email, username, password, startTime:sdate, endTime:edate, genre: selectedGenres, rank, interestedGames: interestedGames.map((elem) => elem.id) })
        if (res.error) {
            console.log(res.error)
            return
        }
        localStorage.setItem("token", res);
        router("/")
    }
    async function handleLogin(e) {
        e.preventDefault();
        console.log({ username, password })
        // return;
        const res = await apiHelper.login({ username, password })
        if (res.error) {
            console.log(res.error)
            return
        }
        localStorage.setItem("token", res);
        router("/")
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (!e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)) {
            e.target.setCustomValidity("Password must have at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long");
        } else {
            e.target.setCustomValidity("");
        }
    }
    return (
        <div className=' flex min-h-screen flex-col justify-start gap-8 items-center py-6 px-6'>
            {mode === "signup" ?
                <form onSubmit={handleSignup} className=' bg-zinc-950 w-full md:w-1/2 text-slate-50 px-6 py-6 rounded-xl border border-transparent hover:border-yellow-500 focus:border-yellow-500 flex flex-col gap-3'>
                    <section className=' flex flex-col gap-1 w-full justify-center items-center py-2'>
                        <h1 className=' text-2xl font-bold'>Signup</h1>
                        <p onClick={() => { setMode("login") }} className=' cursor-pointer text-yellow-500 underline decoration-transparent transition-all hover:decoration-yellow-500'>Already have an account?</p>
                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>Username</h2>
                        <input value={username} onChange={(e) => { setUsername(e.target.value) }} required type="text" placeholder='ligmaballs' className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>Email</h2>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required type="email" placeholder='joemama@ligmaballs.in' className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>Password</h2>
                        <input value={password} onChange={handlePasswordChange} required type="password" placeholder='joemama@ligmaballs.in' className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>When do you game?</h2>
                        <div className=' flex w-full flex-row gap-2'>
                            <input value={startTime} onChange={(e) => { setStartTime(e.target.value) }} required type="time" className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                            <input value={endTime} onChange={(e) => { setEndTime(e.target.value) }} required type="time" className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                        </div>
                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>Genres</h2>
                        <select required={selectedGenres.length===0} value={""} onChange={(e) => { e.target.value !== "" && selectedGenres.length < 7 && setSelectedGenres((prev) => [...prev, e.target.value]) }} name="" id="" className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base'>
                            <option className=' text-zinc-50 bg-zinc-950' value={""}>{"Select a genre"}</option>

                            {genres.map((elem, ind) => {
                                return (
                                    <option className=' text-zinc-50 bg-zinc-950' key={'genre-' + ind} value={elem}>{elem}</option>
                                )
                            })}
                        </select>
                        <div className=' flex flex-row flex-wrap gap-2 py-2'>
                            {selectedGenres.map((elem, ind) => (<div key={`selected-genre-${ind}`} className=' py-2 px-3 bg-yellow-500 text-zinc-950 flex flex-row gap-1 justify-start items-center rounded-lg font-semibold text-base'>
                                <h1>{elem}</h1>
                                <FaPlusCircle onClick={() => { setSelectedGenres(prev => prev.filter((item) => item !== elem)) }} className=' rotate-45 cursor-pointer' />
                            </div>))}
                        </div>
                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>Rank</h2>
                        <select required value={rank} onChange={(e) => { e.target.value !== "" && setRank(e.target.value) }} name="" id="" className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base'>
                            <option className=' text-zinc-50 bg-zinc-950' value={""}>{"None"}</option>
                            {gameRanks.map((elem, ind) => {
                                return (
                                    <option className=' text-zinc-50 bg-zinc-950' key={'rank-' + ind} value={elem}>{elem}</option>
                                )
                            })}
                        </select>
                    </section>
                    <section className=' flex flex-col '>
                        <div className=' relative mt-2'>
                            <div className=' z-30 absolute bottom-0 w-full h-fit rounded-lg overflow-clip'>
                                {suggestions.map((elem, ind) => {
                                    return (
                                        <div onClick={() => {
                                            setInterestedGames(prev => [...prev, elem]);
                                            setSearchTerm("")
                                        }} key={`suggestion-${ind}`} className={`py-2 px-5 bg-slate-50 hover:bg-zinc-900 text-zinc-950 hover:text-slate-50 transition-all ${ind === suggestions.length - 1 ? "" : " border-b border-zinc-400"}`} >
                                            <h2 className=' text-xl font-semibold '>{elem.name}</h2>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <h2 className=' font-semibold text-lg'>Games you like</h2>
                        <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} required={interestedGames.length===0} type="text" placeholder='ludo' className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                        <div className=' flex flex-row flex-wrap gap-2 py-2'>
                            {interestedGames.map((elem, ind) => (<div key={`selected-games-${ind}`} className=' py-2 px-3 bg-yellow-500 text-zinc-950 flex flex-row gap-1 justify-start items-center rounded-lg font-semibold text-base'>
                                <h1>{elem.name}</h1>
                                <FaPlusCircle onClick={() => { setInterestedGames(prev => prev.filter((item) => item.id !== elem.id)) }} className=' rotate-45 cursor-pointer' />
                            </div>))}
                        </div>
                    </section>
                    <button type='submit' className=' w-full px-5 py-2 border border-transparent hover:border-yellow-500 transition-all bg-yellow-500 text-zinc-950 hover:bg-zinc-950 hover:text-yellow-500 rounded-xl text-xl font-bold'>Submit</button>
                </form>
                :
                <form onSubmit={handleLogin} className=' bg-zinc-950 w-full md:w-1/2 text-slate-50 px-6 py-6 rounded-xl border border-transparent hover:border-yellow-500 focus:border-yellow-500 flex flex-col gap-3'>
                    <section className=' flex flex-col gap-1 w-full justify-center items-center py-2'>
                        <h1 className=' text-2xl font-bold'>Login</h1>
                        <p onClick={() => { setMode("signup") }} className=' cursor-pointer text-yellow-500 underline decoration-transparent transition-all hover:decoration-yellow-500'>Don't have an account?</p>

                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>Username</h2>
                        <input value={username} onChange={(e) => { setUsername(e.target.value) }} required type="text" placeholder='ligmaballs' className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                    </section>
                    <section className=' flex flex-col '>
                        <h2 className=' font-semibold text-lg'>Password</h2>
                        <input value={password} onChange={handlePasswordChange} required type="password" placeholder='joemama@ligmaballs.in' className=' bg-transparent border-b border-slate-100 focus:border-yellow-500 outline-none py-2 px-1 text-base' />
                    </section>
                    <button type='submit' className=' w-full px-5 py-2 border border-transparent hover:border-yellow-500 transition-all bg-yellow-500 text-zinc-950 hover:bg-zinc-950 hover:text-yellow-500 rounded-xl text-xl font-bold'>Submit</button>

                </form>}
        </div>
    )
}
