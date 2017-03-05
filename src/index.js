import React from 'react';
import {render} from 'react-dom';

import Routers from './routes.js';
import './main.css'
import 'highlight.js/styles/school-book.css'

render(<Routers />,document.getElementById('root'));
