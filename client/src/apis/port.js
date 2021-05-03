import io from 'socket.io-client';

const port ="https://git.heroku.com/tic-tac-toe-321.git" ; 
const socket = io(port);
export default socket;