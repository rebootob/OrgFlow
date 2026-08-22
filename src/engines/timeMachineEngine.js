/**
 * OrgFlow — Time Machine Effective Date Engine
 * Version: 3.0.0
 * 
 * Filters org assignments based on a target Effective Date (Historical, Current, or Future).
 * Serves as the Source of Truth for Historical Org Structure timelines.
 */

export class TimeMachineEngine {
    /**
     * Filters assignments active on a given target date.
     * 
     * @param {Array<Object>} assignmentList List of assignment records
     * @param {String|Date} targetDate Target date ISO string or Date object
     * @returns {Array<Object>} Active assignments on target date
     */
    getAssignmentsForDate(assignmentList = [], targetDate = new Date()) {
        const queryTime = new Date(targetDate).getTime();

        return assignmentList.filter(asg => {
            const startTime = new Date(asg.effectiveStartDate).getTime();
            const endTime = asg.effectiveEndDate ? new Date(asg.effectiveEndDate).getTime() : Infinity;

            return startTime <= queryTime && queryTime <= endTime;
        });
    }

    /**
     * Categorizes assignments relative to today's date.
     * 
     * @param {Array<Object>} assignmentList List of assignment records
     * @param {Date} today Reference date
     * @returns {Object} Categorized assignment groups
     */
    categorizeAssignments(assignmentList = [], today = new Date()) {
        const nowTime = today.getTime();
        const historical = [];
        const current = [];
        const future = [];

        assignmentList.forEach(asg => {
            const startTime = new Date(asg.effectiveStartDate).getTime();
            const endTime = asg.effectiveEndDate ? new Date(asg.effectiveEndDate).getTime() : Infinity;

            if (startTime > nowTime) {
                future.push(asg);
            } else if (endTime < nowTime) {
                historical.push(asg);
            } else {
                current.push(asg);
            }
        });

        return {
            historicalCount: historical.length,
            currentCount: current.length,
            futureCount: future.length,
            historical,
            current,
            future
        };
    }
}

export const timeMachineEngine = new TimeMachineEngine();
export default timeMachineEngine;
