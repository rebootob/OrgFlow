/**
 * OrgFlow — Vacancy & Headcount Calculator Engine
 * Version: 3.0.0
 * 
 * Calculates approved position quotas, active filled headcount, vacant seats,
 * and over-capacity metrics for departments and positions.
 */

export class VacancyCalculator {
    /**
     * Calculates headcount and vacancy metrics.
     * 
     * @param {Array<Object>} positionList List of position master objects with approved quotas
     * @param {Array<Object>} employeeList List of active normalized employees
     * @returns {Object} Headcount analytics & position breakdown
     */
    calculateVacancy(positionList = [], employeeList = []) {
        const positionBreakdown = [];
        let totalApprovedQuota = 0;
        let totalFilledHeadcount = 0;
        let totalVacancies = 0;
        let totalOverCapacity = 0;

        // Group active employees by positionId
        const activeCountByPosition = new Map();
        employeeList.forEach(emp => {
            if (emp.status !== 'Inactive') {
                const pos = emp.positionId || 'UNASSIGNED';
                activeCountByPosition.set(pos, (activeCountByPosition.get(pos) || 0) + 1);
            }
        });

        // Evaluate positions with quotas
        positionList.forEach(pos => {
            const quota = Number(pos.headcountQuota || 0);
            const filled = activeCountByPosition.get(pos.positionId || pos.id) || 0;
            const vacancy = Math.max(0, quota - filled);
            const overCapacity = Math.max(0, filled - quota);

            totalApprovedQuota += quota;
            totalFilledHeadcount += filled;
            totalVacancies += vacancy;
            totalOverCapacity += overCapacity;

            positionBreakdown.push({
                positionId: pos.positionId || pos.id,
                positionTitle: pos.title || pos.nameTH,
                departmentId: pos.departmentId,
                headcountQuota: quota,
                filledHeadcount: filled,
                vacantCount: vacancy,
                overCapacityCount: overCapacity,
                occupancyRate: quota > 0 ? Number(((filled / quota) * 100).toFixed(1)) : 0,
                status: filled > quota ? 'OVER_CAPACITY' : (filled === quota ? 'FILLED' : 'VACANT')
            });
        });

        return {
            summary: {
                totalApprovedQuota,
                totalFilledHeadcount,
                totalVacancies,
                totalOverCapacity,
                overallOccupancyRate: totalApprovedQuota > 0 ? Number(((totalFilledHeadcount / totalApprovedQuota) * 100).toFixed(1)) : 0
            },
            positions: positionBreakdown
        };
    }
}

export const vacancyCalculator = new VacancyCalculator();
export default vacancyCalculator;
