import React from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AppRouter from '../AppRouter/AppRouter'

import style from './App.scss'

function App() {
	return (
		<div className={style.wrapper}>
			<div>
				<Header />
			</div>
			<div>
				<AppRouter />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default App
