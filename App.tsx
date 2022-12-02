import React from 'react';
import { roomData } from './SampleRoom';
import { Viewer } from './components';


export default function App() {
	return <Viewer data={roomData} />;
}
