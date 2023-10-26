import React, { useState, useEffect } from 'react'
import styles from '../../components/camp/Filter.module.scss'

const FilterComponent = ({ onFilterChange }) => {
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedAltitude, setSelectedAltitude] = useState([])
  const [selectedFacilities, setSelectedFacilities] = useState([])
  const [activeFilter, setActiveFilter] = useState('全部');
  const [isRegionVisible, setIsRegionVisible] = useState(false);
  const [isFacilityVisible, setIsFacilityVisible] = useState(false);
  const [isTypeVisible, setIsTypeVisible] = useState(false);
  const [isAltitudeVisible, setIsAltitudeVisible] = useState(false);


  // 區域
  const handleRegionChange = (region) => {
    const updatedRegions = [...selectedRegions]
    if (updatedRegions.includes(region)) {
      const index = updatedRegions.indexOf(region)
      updatedRegions.splice(index, 1)
    } else {
      updatedRegions.push(region)
    }
    setSelectedRegions(updatedRegions)
  }

  // 類型
  const handleTypeChange = (type) => {
    const updatedTypes = [...selectedTypes]
    if (updatedTypes.includes(type)) {
      const index = updatedTypes.indexOf(type)
      updatedTypes.splice(index, 1)
    } else {
      updatedTypes.push(type)
    }
    setSelectedTypes(updatedTypes)
  }

  // 海拔
  const handleAltitudeChange = (altitude) => {
    const updatedAltitude = [...selectedAltitude]
    if (updatedAltitude.includes(altitude)) {
      const index = updatedAltitude.indexOf(altitude)
      updatedAltitude.splice(index, 1)
    } else {
      updatedAltitude.push(altitude)
    }
    setSelectedAltitude(updatedAltitude)
  }

  // 設施
  const facilityMap = {
    wifi: 'Wifi',
    food: '餐飲',
    group: '包區',
    swimming: '戲水',
    fishing: '釣魚',
    stream: '溪流',
    view: '夜景',
    tub: '泡湯',
    rent: '裝備',
    firefly: '螢火蟲',
  }

  const handleFacilitySelect = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility))
    } else {
      setSelectedFacilities([...selectedFacilities, facility])
    }
  }

  // 清除所有筛选条件
  const handleClearFilters = () => {
    setSelectedRegions([]);
    setSelectedTypes([]);
    setSelectedAltitude([]);
    setSelectedFacilities([]);
    setActiveFilter(''); // 清空激活状态

    // 如果 activeFilter 当前为 '地區'，则再次点击时隐藏按钮容器
    if (activeFilter === '地區') {
      setIsRegionVisible(false);
    }

    onFilterChange([], [], [], []); // 触发筛选
  }


  useEffect(() => {
    // 當任何條件產生時，觸發篩選
    onFilterChange(
      selectedRegions,
      selectedTypes,
      selectedAltitude,
      selectedFacilities
    )
  }, [selectedFacilities, selectedRegions, selectedTypes, selectedAltitude])

  return (
    <div className={styles.navbar}>
      <div className={styles.itemContainer}>
        <div className={`${styles.navItemWrapper}`}>
          <h3
            className={`${styles.navItem} ${activeFilter === '全部' && styles.active
              }`}
            onClick={handleClearFilters}
          >
            全部
          </h3>
        </div>
      </div>

      <div className={styles.itemContainer}>
        <div className={`${styles.navItemWrapper}`}>
          <h3
            className={`${styles.navItem} ${activeFilter === '地區' && styles.active
              }`}
            onClick={() => {
              if (activeFilter === '地區') {
                // 如果已经是 '地區'，再次点击将隐藏
                setActiveFilter(''); // 清空激活状态
                setIsRegionVisible(false); // 设置为不可见
              } else {
                // 如果不是 '地區'，再次点击将显示
                setActiveFilter('地區');
                setIsRegionVisible(true); // 设置为可见
                // 隐藏其他导航栏项
                setIsFacilityVisible(false);
                setIsTypeVisible(false);
                setIsAltitudeVisible(false);
              }
            }}
          >
            地區
          </h3>
        </div>
        {activeFilter === '地區' && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => handleRegionChange(1)}
              className={`${styles.myButton} ${selectedRegions.includes(1) ? styles.selectedButton : ''
                }`}
            >
              北部
            </button>
            <button
              onClick={() => handleRegionChange(2)}
              className={`${styles.myButton} ${selectedRegions.includes(2) ? styles.selectedButton : ''
                }`}
            >
              中部
            </button>
            <button
              onClick={() => handleRegionChange(3)}
              className={`${styles.myButton} ${selectedRegions.includes(3) ? styles.selectedButton : ''
                }`}
            >
              南部
            </button>
            <button
              onClick={() => handleRegionChange(4)}
              className={`${styles.myButton} ${selectedRegions.includes(4) ? styles.selectedButton : ''
                }`}
            >
              東部
            </button>
            <button
              onClick={() => handleRegionChange(5)}
              className={`${styles.myButton} ${selectedRegions.includes(5) ? styles.selectedButton : ''
                }`}
            >
              外島
            </button>
          </div>
        )}
      </div>

      <div className={styles.itemContainer}>
        <div className={`${styles.navItemWrapper}`}>
          <h3
            className={`${styles.navItem} ${activeFilter === '設施' && styles.active
              }`}
            onClick={() => {
              if (activeFilter === '設施') {
                setActiveFilter('');
                setIsFacilityVisible(false);
              } else {
                setActiveFilter('設施');
                setIsRegionVisible(false);
                setIsTypeVisible(false);
                setIsAltitudeVisible(false);
              }
            }}
          >
            設施
          </h3>

        </div>
        {activeFilter === '設施' && (
          <div className={styles.buttonContainer}>
            {Object.keys(facilityMap).map((facility) => (
              <button
                key={facility}
                onClick={() => handleFacilitySelect(facility)}
                className={`${styles.myButton} ${selectedFacilities.includes(facility)
                  ? styles.selectedButton
                  : ''
                  }`}
              >
                {facilityMap[facility]}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.itemContainer}>
        <div className={`${styles.navItemWrapper}`}>          
          <h3
            className={`${styles.navItem} ${activeFilter === '類型' && styles.active
              }`}
            onClick={() => {
              if (activeFilter === '類型') {
                setActiveFilter(''); 
                setIsFacilityVisible(false); 
              } else {
                setActiveFilter('類型');
                setIsRegionVisible(false);
                setIsTypeVisible(false);
                setIsAltitudeVisible(false);
              }
            }}
          >
            類型
          </h3>
        </div>
        {activeFilter === '類型' && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => handleTypeChange(1)}
              className={`${styles.myButton} ${selectedTypes.includes(1) ? styles.selectedButton : ''
                }`}
            >
              自搭
            </button>
            <button
              onClick={() => handleTypeChange(2)}
              className={`${styles.myButton} ${selectedTypes.includes(2) ? styles.selectedButton : ''
                }`}
            >
              懶人
            </button>
            <button
              onClick={() => handleTypeChange(3)}
              className={`${styles.myButton} ${selectedTypes.includes(3) ? styles.selectedButton : ''
                }`}
            >
              豪華
            </button>
            <button
              onClick={() => handleTypeChange(4)}
              className={`${styles.myButton} ${selectedTypes.includes(4) ? styles.selectedButton : ''
                }`}
            >
              露營車
            </button>
            <button
              onClick={() => handleTypeChange(5)}
              className={`${styles.myButton} ${selectedTypes.includes(5) ? styles.selectedButton : ''
                }`}
            >
              露營屋
            </button>
          </div>
        )}
      </div>
      <div className={styles.itemContainer}>
        <div className={`${styles.navItemWrapper}`}>
        <h3
            className={`${styles.navItem} ${activeFilter === '海拔' && styles.active
              }`}
            onClick={() => {
              if (activeFilter === '海拔') {
                setActiveFilter(''); 
                setIsFacilityVisible(false); 
              } else {
                setActiveFilter('海拔');
                setIsRegionVisible(false);
                setIsTypeVisible(false);
                setIsAltitudeVisible(false);
              }
            }}
          >
            海拔
          </h3>
        </div>
        {activeFilter === '海拔' && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => handleAltitudeChange('低海拔')}
              className={`${styles.myButton} ${selectedAltitude.includes('低海拔') ? styles.selectedButton : ''
                }`}
            >
              低海拔
            </button>
            <button
              onClick={() => handleAltitudeChange('中海拔')}
              className={`${styles.myButton} ${selectedAltitude.includes('中海拔') ? styles.selectedButton : ''
                }`}
            >
              中海拔
            </button>
            <button
              onClick={() => handleAltitudeChange('高海拔')}
              className={`${styles.myButton} ${selectedAltitude.includes('高海拔') ? styles.selectedButton : ''
                }`}
            >
              高海拔
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterComponent
