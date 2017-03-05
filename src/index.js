import React from 'react';
import {render} from 'react-dom';

import Routers from './routes.js';
import './main.css'
import './post.css'
import 'highlight.js/styles/atom-one-light.css'

render(<Routers />,document.getElementById('root'));
