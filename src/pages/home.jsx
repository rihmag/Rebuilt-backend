import Navbar from '../components/navbar'
import TopStories from '../components/TopStories'
import PopularStories from '../components/PopularStories'
import Health from '../components/Health'
import Travel from '../components/Travel'
import Sports from '../components/Sports'
import SportsStyle2 from '../components/SportsStyle-2'
import FashionStyle2 from '../components/FashionStyle-2'
import TravelStyle2 from '../components/TravelStyle-2'
import Random from '../components/Random'
import YouMissed from '../components/YouMissed'
import TravelTech from '../components/TravelTech'
import SportStyle3 from '../components/SportStyle-3'

const Home = () => {
	return (
		<div>
			<Navbar />
			<TopStories />
			<PopularStories />

			<section className='bg-gray-50'>
				<div className='container mx-auto px-4 py-6'>
					<div className='grid grid-cols-1 md:grid-cols-10 gap-6'>
						<div className='md:col-span-7 space-y-6'>
							<Health />
							<Sports />
							<TravelTech />
							<SportsStyle2 />
							<FashionStyle2 />
							<TravelStyle2 />
							<Random />
						</div>
						<div className='md:col-span-3 space-y-6 md:sticky md:top-4 h-fit'>
							<Travel />
							<div className='px-2 sm:px-0'>
								<SportStyle3 />
							</div>
						</div>
					</div>
				</div>
			</section>
			<YouMissed />
		</div>
	)
}

export default Home
