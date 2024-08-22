import axiosInstance from '@/utils/http'

export function getNodeDataApi() {
  return axiosInstance({
    url: "/getNodeData?apifoxApiId=207283196",
    method: "get"
  })
}