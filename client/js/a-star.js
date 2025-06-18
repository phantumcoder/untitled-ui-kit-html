/**
 * Represents a node in a grid-based structure.
 * Typically used for pathfinding algorithms.
 */
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 0
        this.h = 0
        this.f = 0
        this.parent = null;
        this.isWall = false;
    }
}

/**
 * Implements the A* pathfinding algorithm to find the shortest
 * path between a start and an end point on a grid-based map.
 *
 * @param {Array<Array<Cell>>} grid - A 2D grid representing the map, where each cell contains properties such as g, h, f, isWall, and parent.
 * @param {Cell} start - The starting cell for the pathfinding process.
 * @param {Cell} end - The target cell where the path should terminate.
 * @returns {Array<Cell>} An array of cells representing the shortest path from start to end, or an empty array if no path is found.
 */
const a_star = (grid, start, end) => {
    const openSet = [];
    const closedSet = new Set()

    openSet.push(start)

    while (openSet.length) {
        let curr = openSet[0]

        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < curr.f || (openSet[i].f === curr.f && openSet[i].h < curr.h)) {
                curr = openSet[i]
            }

            const currIdx = openSet.indexOf(curr)
            openSet.splice(currIdx, 1)
            closedSet.add(curr)

            if (curr === end) {
                const path = []
                let temp = curr

                while (temp) {
                    path.push(temp)
                    temp = temp.parent
                }

                return path.reverse()
            }

            const neighbors = getNeighbors(grid, curr)

            for (const neighbor of neighbors) {
                if (neighbor.isWall || closedSet.has(neighbor)) continue

                const newGCost = curr.g + getDistance(curr, neighbor)

                if (newGCost < neighbor.g || !openSet.includes(neighbor)) {
                    neighbor.g = newGCost
                    neighbor.h = getDistance(neighbor, end)
                    neighbor.f = neighbor.g + neighbor.h
                    neighbor.parent = curr
                }

                if (!openSet.includes(neighbor)) openSet.push(neighbor)
            }
        }
    }

    // no path was found
    return []
}

/**
 * Retrieves all valid neighboring nodes for a given node within a grid.
 *
 * @param {Array<Array<any>>} grid - A 2D array representing the grid structure.
 * @param {Object} node - An object representing the current node, containing x and y coordinates.
 * @param {number} node.x - The x-coordinate of the current node.
 * @param {number} node.y - The y-coordinate of the current node.
 * @returns {Array<any>} An array of neighboring nodes, excluding the original node and nodes outside of the grid boundaries.
 */
const getNeighbors = (grid, node) => {
    const neighbors = []
    const { x, y } = node
    const gw = grid[0].length
    const gh = grid.length

    for (let i = -1; i <= 1; i++) {
        for (let k = -1; k <= 1; k++) {
            if (i === 0 && k === 0) continue

            const check_x = x + i
            const check_y = y + k

            if (check_x >= 0 && check_x < gw && check_y >= 0 && check_y < gh) {
                neighbors.push(grid[check_x][check_y])
            }
        }
    }

    return neighbors
}

/**
 * Calculates the Euclidean distance between two points in a 2D space.
 *
 * @param {Object} a - The first point with x and y coordinates.
 * @param {number} a.x - The x-coordinate of the first point.
 * @param {number} a.y - The y-coordinate of the first point.
 * @param {Object} b - The second point with x and y coordinates.
 * @param {number} b.x - The x-coordinate of the second point.
 * @param {number} b.y - The y-coordinate of the second point.
 * @returns {number} The Euclidean distance between the two points.
 */
const getDistance = (a, b) => {
    const dx = Math.abs(a.x - b.x)
    const dy = Math.abs(a.y - b.y)

    return Math.sqrt(dx * dx + dy * dy)
}