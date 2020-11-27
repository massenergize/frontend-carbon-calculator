import api from '../../api/massEnergize'

// fetchGroups action, fetch all groups for user selection
export const fetchGroups = async () => {
  const response = await api.get(`/cc/info/groups`)
  return response.data.data.groupList
}
