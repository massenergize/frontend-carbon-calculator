import axios from 'axios';
import { ROOT } from './urls';

export default axios.create({
    baseURL: ROOT
});