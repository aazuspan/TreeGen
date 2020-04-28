const ORIENTATION = {
    COLINEAR: 0,
    CW: 1,
    CCW: 2
}

// Check if two lines segments (p1-q1 and p2-q2) intersect at any point
export const isIntersecting = (p1, q1, p2, q2) => {
    let o1 = getOrientation(p1, q1, p2);
    let o2 = getOrientation(p1, q1, q2);
    let o3 = getOrientation(p2, q2, p1);
    let o4 = getOrientation(p2, q2, q1);

    let intersect = false;

    // General intersection rules
    if (o1 !== o2 && o3 !== o4) {
        intersect = true;
    }

    // Colinear rules
    if (o1 === 0 && isOnSegment(p1, p2, q1)) {
        interesect = true;
    }
    if (o2 === 0 && isOnSegment(p1, q2, q1)) {
        intersect = true;
    }
    if (o3 === 0 && isOnSegment(p2, q1, q2)) {
        intersect = true;
    }
    if (o4 === 0 && isOnSegment(p2, q1, q2)) {
        intersect = true;
    }

    return intersect;
}


// For a colinear line pqr, check if q is on segment pr
const isOnSegment = (p, q, r) => {
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) {
        return true;
    }
    return false;
}

// Return the orientation of a set of 3 ordered points
const getOrientation = (p, q, r) => {
    let val = ((q.y - p.y) * (r.x - q.x)) - ((q.x - p.x) * (r.y - q.y));

    let orientation;

    if (val > 0) {
        orientation = ORIENTATION.CW;
    }
    else if (val < 0) {
        orientation = ORIENTATION.CCW;
    }
    else {
        orientation = ORIENTATION.COLINEAR;
    }

    return orientation;
}