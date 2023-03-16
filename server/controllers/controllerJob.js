const axios = require('axios')

class Controller {
  static async getJob(req, res, next) {
    try {
      const pageSize = 8
      const { page, description, location, full_time } = req.query
      const { data } = await axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json')
      
      const filteredData = data.filter(job => {
        const matchesDescription = job.description.includes(description?description:'') || !description;
        const matchesLocation = job.location.includes(location?location:'')
        const matchesType = job.type.includes(full_time=='true'?'Full Time':'')
        // console.log(matchesDescription, matchesLocation, matchesType)
        return matchesDescription && matchesLocation && matchesType;
      });
      
      const startIndex = ((page?page:1) - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pagedData = filteredData.slice(startIndex, endIndex)
      console.log(startIndex, endIndex, pagedData.length)
      console.log(data.length, filteredData.length, req.query, new Date().getTime())

      res.status(200).json({ statusCode: 200, message:'Fetched all records' , data:pagedData, page: page?+page:1, totalPage: Math.ceil(filteredData.length/pageSize) })
    } catch (error) {
      next(error)
    }
  }

  static async getJobById(req, res, next) {
    try {
      let { id } = req.params
      const { data } = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`)
      
      if (Object.keys(data).length) {
        res.status(200).json({ statusCode: 200, message: `Fetched record with given id: ${id}`, data })
      } else {
        throw {name: 'RecordNotFound'}
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller