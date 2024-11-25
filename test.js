const points = {};
for (var i = 0; i < 100; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const z = Math.floor(Math.random() * 100);
    points[`dot${i}`] = [x, y, z];
}
console.log(points);