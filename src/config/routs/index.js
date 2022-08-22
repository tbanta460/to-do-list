import React from 'react';
import { Routes, Route} from "react-router-dom";

// Element

// Component
import { Home, Detail } from '../../pages';
const Routess = () => {
	return (
		<>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/detail/:id" element={<Detail />}/>
				</Routes>
		</>
	)
}

export default Routess