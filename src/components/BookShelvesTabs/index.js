import './index.css'

const Tabs = props => {
  const {item, isActive, changeTabId} = props
  const activeCss = isActive ? 'blue-color' : ''
  const onClickButton = () => {
    changeTabId(item)
  }
  return (
    <li value={item.value} onClick={onClickButton}>
      <button type="button" className={`tab-button ${activeCss}`}>
        {item.label}
      </button>
    </li>
  )
}

export default Tabs
