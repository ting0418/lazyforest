import React, { useEffect, useState } from 'react'
import Card from '../../components/camp/Card'
import Filter from '../../components/camp/filter'
import Date from '../../components/camp/Date'
import Search from '../../components/camp/Search'
import styles from '../../styles/Category.module.scss'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import Title from '../../components/camp/title'

const apiUrl = 'http://localhost:3005/api/campground'

const CategoryPage = () => {
  const [campground, setCampground] = useState([])
  const [selectedRegion, setSelectedRegion] = useState([])
  const [selectedType, setSelectedType] = useState([])
  const [selectedAltitude, setSelectedAltitude] = useState([])
  const [selectedFacilities, setSelectedFacilities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCampground, setFilteredCampground] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const campgroundData = response.data.finalData
        if (campgroundData) {
          const uniqueIds = new Set()
          const uniqueCampgroundData = []
          campgroundData.forEach((data) => {
            if (!uniqueIds.has(data.camp_name)) {
              uniqueIds.add(data.camp_name)
              uniqueCampgroundData.push(data)
            }
          })

          setCampground(uniqueCampgroundData)
          setFilteredCampground(uniqueCampgroundData)
        } else {
          console.error('No campground data available.')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])


  // 清除筛选条件的函数
  const handleClearFilters = () => {
    setSelectedRegion([]); // 重置所选区域
    setSelectedType([]); // 重置所选类型
    setSelectedAltitude([]); // 重置所选海拔
    setSelectedFacilities([]); // 重置所选设施
  }

  // 篩選
  const handleFilterChange = (region, type, altitude, facilities) => {
    setSelectedRegion(region)
    setSelectedType(type)
    setSelectedAltitude(altitude)
    setSelectedFacilities(facilities)
  }

  const filterByAltitude = (campData) => {
    if (selectedAltitude.length === 0) {
      return true
    }

    const altitudeFilter = selectedAltitude.map((alt) => {
      switch (alt) {
        case '低海拔':
          return { min: 0, max: 500 }
        case '中海拔':
          return { min: 500, max: 1000 }
        case '高海拔':
          return { min: 1000, max: Infinity }
        default:
          return null
      }
    })

    const campAltitude = parseFloat(campData.camp_altitude)

    return altitudeFilter.some((range) => {
      if (range) {
        return campAltitude >= range.min && campAltitude <= range.max
      }
      return false
    })
  }

  const filterByFacilities = (campData) => {
    if (!selectedFacilities || selectedFacilities.length === 0) {
      return true
    }

    return selectedFacilities.every((facility) => campData[facility] === 1)
  }

  const handleSearch = () => {
    console.log('Start Date:', startDate)
    console.log('End Date:', endDate)
    console.log('Search Term:', searchTerm)
  }
  // 應用所有篩選條件
  const handleSearchButtonClick = () => {
    const updatedCampground = campground.filter((campData) => {
      const matchesRegion =
        !selectedRegion ||
        selectedRegion.length === 0 ||
        selectedRegion.includes(campData.camp_area)
      const matchesType =
        !selectedType ||
        selectedType.length === 0 ||
        selectedType.includes(campData.camp_type)
      const matchesAltitude = filterByAltitude(campData)
      const matchesFacilities =
        !selectedFacilities ||
        selectedFacilities.length === 0 ||
        selectedFacilities.every((facility) => campData[facility] === 1)

      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      const matchesName = campData.camp_name
        .toLowerCase()
        .includes(lowerCaseSearchTerm)
      const matchesAddress = campData.camp_address
        .toLowerCase()
        .includes(lowerCaseSearchTerm)

      return (
        matchesRegion &&
        matchesType &&
        matchesAltitude &&
        matchesFacilities &&
        (matchesName || matchesAddress)
      )
    })
    setFilteredCampground(updatedCampground)
    setCampgroundOffset(0) // 重置分頁
    window.scrollTo(0, 0) // 頁面置頂
  }

  const handleSearchTermChange = (term) => {
    setSearchTerm(term)
    // 更新结果
  }

  const handleStartDateChange = (date) => {
    setStartDate(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${year}-${month}-${day}`
    localStorage.setItem('startDate', formattedDate)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${year}-${month}-${day}`
    localStorage.setItem('endDate', formattedDate)
  }

  // 分頁
  const campgroundPerPage = 6

  const [campgroundOffset, setCampgroundOffset] = useState(0)

  const endOffset = campgroundOffset + campgroundPerPage
  const currentCampground = filteredCampground.slice(
    campgroundOffset,
    endOffset
  )
  const pageCount = Math.ceil(filteredCampground.length / campgroundPerPage)

  // 點選分頁
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * campgroundPerPage) % filteredCampground.length
    setCampgroundOffset(newOffset)
    // 頁面置頂
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles['container']}>
      <Title />
      <div className={styles['searchBar']}>
        <Date
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />

        <div className={styles.searchWrapper}>
          <Search
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
            onSearch={handleSearch}
          />
        </div>
        <div>
          <button
            className={styles.searchButton}
            onClick={handleSearchButtonClick}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <Filter
        onFilterChange={handleFilterChange}
        className={styles.filterContainer}
      />
      <div className={styles.searchResult}>
        共有 {filteredCampground.length} 個符合的營地
      </div>

      <div className={styles['card-container']}>
        {currentCampground.map((campData, index) => (
          <Card
            id={campData.id}
            key={index}
            camp_img={campData.camp_img}
            camp_name={campData.camp_name}
            camp_address={campData.camp_address}
            wifi={campData.wifi}
            food={campData.food}
            group={campData.group}
            swimming={campData.swimming}
            rent={campData.rent}
            fishing={campData.fishing}
            stream={campData.stream}
            firefly={campData.firefly}
            view={campData.view}
            tub={campData.tub}
            rating={campData.rating}
          />
        ))}
      </div>

      {/* 分頁 */}
      <div className="mt-5">
        <ReactPaginate
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          // page-item
          pageClassName="pageBtn"
          previousClassName="pageBtn goBtn"
          nextClassName="pageBtn goBtn"
          breakClassName="pageBtn"
          // active
          activeClassName="pageActive"
          // container
          containerClassName="pageContainer"
          // link
          pageLinkClassName="pageLink"
          previousLinkClassName="pageLink goLink"
          nextLinkClassName="pageLink goLink"
          breakLinkClassName="pageLink"
        />
      </div>
    </div>
  )
}

export default CategoryPage
