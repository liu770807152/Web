/**
 * @param {list(Map)} flights: a flight path from departure city to destination
 * @returns "Direct" if the path has 1 map, "1 stop" if the path has 2 maps and "X stops" if the path has X+1 maps
 */
function getStop(flights) {
    return {
    1: 'Direct',
    2: '1 stop',
    // 34: 'World Trip'   ->   extendable
    } [flights.length] || `${flights.length - 1} stops`;
}

console.log(getStop([{"source": "Beijing", "destination": "Canton"}]));
console.log(getStop([{"source": "Beijing", "destination": "Shanghai"}, 
                    {"source": "Shanghai", "destination": "Canton"}]));
console.log(getStop([{"source": "Beijing", "destination": "Shanghai"}, 
                    {"source": "Shanghai", "destination": "Chongqing"}, 
                    {"source": "Chongqing", "destination": "Shenzhen"},
                    {"source": "Chongqing", "destination": "Canton"}]));



                    