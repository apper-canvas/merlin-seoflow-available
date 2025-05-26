import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: "TechStart Inc",
      contactPerson: "Sarah Johnson",
      email: "sarah@techstart.com",
      phone: "+1 (555) 123-4567",
      website: "techstart.com",
      status: "Active",
      industry: "Technology",
      projects: 3,
      lastContact: "2024-01-15",
      value: 25000,
      notes: "Important client with multiple ongoing projects"
    },
    {
      id: 2,
      companyName: "GreenLeaf Solutions",
      contactPerson: "Mike Chen",
      email: "mike@greenleaf.co",
      phone: "+1 (555) 987-6543",
      website: "greenleaf.co",
      status: "Active",
      industry: "Environmental",
      projects: 2,
      lastContact: "2024-01-12",
      value: 18000,
      notes: "Growing business, potential for expansion"
    },
    {
      id: 3,
      companyName: "Urban Fitness",
      contactPerson: "Lisa Rodriguez",
      email: "lisa@urbanfitness.com",
      phone: "+1 (555) 456-7890",
      website: "urbanfitness.com",
      status: "Inactive",
      industry: "Health & Fitness",
      projects: 1,
      lastContact: "2024-01-08",
      value: 12000,
      notes: "Seasonal client, contact before summer"
    },
    {
      id: 4,
      companyName: "Digital Marketing Pro",
      contactPerson: "James Wilson",
      email: "james@digitalmarketingpro.com",
      phone: "+1 (555) 321-0987",
      website: "digitalmarketingpro.com",
      status: "Active",
      industry: "Marketing",
      projects: 5,
      lastContact: "2024-01-20",
      value: 35000,
      notes: "High-value client with ongoing retainer"
    },
    {
      id: 5,
      companyName: "Local Restaurant Group",
      contactPerson: "Maria Garcia",
      email: "maria@localrestaurantgroup.com",
      phone: "+1 (555) 654-3210",
      website: "localrestaurantgroup.com",
      status: "Prospect",
      industry: "Food & Beverage",
      projects: 0,
      lastContact: "2024-01-18",
      value: 0,
      notes: "Interested in local SEO services"
    }
  ])

  const [columns, setColumns] = useState([
    { key: 'companyName', label: 'Company Name', width: 200, type: 'text', visible: true, frozen: false },
    { key: 'contactPerson', label: 'Contact Person', width: 150, type: 'text', visible: true, frozen: false },
    { key: 'email', label: 'Email', width: 200, type: 'email', visible: true, frozen: false },
    { key: 'phone', label: 'Phone', width: 150, type: 'tel', visible: true, frozen: false },
    { key: 'website', label: 'Website', width: 150, type: 'url', visible: true, frozen: false },
    { key: 'status', label: 'Status', width: 120, type: 'select', options: ['Active', 'Inactive', 'Prospect', 'Lost'], visible: true, frozen: false },
    { key: 'industry', label: 'Industry', width: 150, type: 'text', visible: true, frozen: false },
    { key: 'projects', label: 'Projects', width: 100, type: 'number', visible: true, frozen: false },
    { key: 'lastContact', label: 'Last Contact', width: 130, type: 'date', visible: true, frozen: false },
    { key: 'value', label: 'Value ($)', width: 120, type: 'number', visible: true, frozen: false },
    { key: 'notes', label: 'Notes', width: 250, type: 'text', visible: true, frozen: false }
  ])


  const [selectedCell, setSelectedCell] = useState(null)
  const [editingCell, setEditingCell] = useState(null)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, column: null })
  
  const [editValue, setEditValue] = useState('')
  
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingCell])
  const contextMenuRef = useRef(null)

  const filteredClients = clients.filter(client => {
    const matchesSearch = Object.values(client).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesFilter = filterStatus === 'all' || client.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu({ visible: false, x: 0, y: 0, column: null })
      }
    }

    const handleScroll = () => {
      setContextMenu({ visible: false, x: 0, y: 0, column: null })
    }

    if (contextMenu.visible) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', handleScroll, true)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [contextMenu.visible])

  const handleCellClick = (rowIndex, columnKey) => {


    const cellId = `${rowIndex}-${columnKey}`
    setSelectedCell(cellId)
    
    if (selectedCell === cellId) {
      startEditing(rowIndex, columnKey)
    }
  }

  const startEditing = (rowIndex, columnKey) => {
    const client = filteredClients[rowIndex]
    setEditingCell(`${rowIndex}-${columnKey}`)
    setEditValue(client[columnKey] || '')
  }

  const stopEditing = () => {
    if (editingCell) {
      const [rowIndex, columnKey] = editingCell.split('-')
      const clientIndex = clients.findIndex(c => c.id === filteredClients[parseInt(rowIndex)].id)
      
      if (clientIndex !== -1) {
        const updatedClients = [...clients]
        const column = columns.find(col => col.key === columnKey)
        
        let value = editValue
        if (column && column.type === 'number') {
          value = parseFloat(editValue) || 0
        }
        
        updatedClients[clientIndex] = {
          ...updatedClients[clientIndex],
          [columnKey]: value
        }
        
        setClients(updatedClients)
        toast.success('Cell updated successfully')
      }
      
      setEditingCell(null)
      setEditValue('')
    }
  }



  // Sort clients based on current sort settings
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (aValue === bValue) return 0
    
    const comparison = aValue < bValue ? -1 : 1
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const finalClients = sortedClients

  // Get visible columns
  const visibleColumns = columns.filter(col => col.visible)

  const handleColumnRightClick = (e, column) => {
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      column: column
    })
  }

  const handleSort = (columnKey, direction) => {
    setSortColumn(columnKey)
    setSortDirection(direction)
    setContextMenu({ visible: false, x: 0, y: 0, column: null })
    toast.success(`Sorted by ${columns.find(col => col.key === columnKey)?.label} (${direction}ending)`)
  }

  const toggleColumnVisibility = (columnKey) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    )
    setColumns(updatedColumns)
    setContextMenu({ visible: false, x: 0, y: 0, column: null })
    const column = columns.find(col => col.key === columnKey)
    toast.success(`${column.label} column ${column.visible ? 'hidden' : 'shown'}`)
  }

  const toggleColumnFreeze = (columnKey) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, frozen: !col.frozen } : col
    )
    setColumns(updatedColumns)
    setContextMenu({ visible: false, x: 0, y: 0, column: null })
    const column = columns.find(col => col.key === columnKey)
    toast.success(`${column.label} column ${column.frozen ? 'unfrozen' : 'frozen'}`)
  }

  const insertColumn = (afterColumnKey, position = 'after') => {
    const newColumn = {
      key: `custom_${Date.now()}`,
      label: 'New Column',
      width: 150,
      type: 'text',
      visible: true,
      frozen: false
    }
    
    const targetIndex = columns.findIndex(col => col.key === afterColumnKey)
    const insertIndex = position === 'after' ? targetIndex + 1 : targetIndex
    
    const updatedColumns = [...columns]
    updatedColumns.splice(insertIndex, 0, newColumn)
    setColumns(updatedColumns)
    
    // Add the column to all existing clients
    const updatedClients = clients.map(client => ({ ...client, [newColumn.key]: '' }))
    setClients(updatedClients)
    
    setContextMenu({ visible: false, x: 0, y: 0, column: null })
    toast.success('New column inserted')
  }

  const deleteColumn = (columnKey) => {
    if (columns.length <= 1) {
      toast.warning('Cannot delete the last column')
      return
    }

    if (window.confirm('Are you sure you want to delete this column? This will remove all data in this column.')) {
      const updatedColumns = columns.filter(col => col.key !== columnKey)
      setColumns(updatedColumns)
      
      // Remove the column from all clients
      const updatedClients = clients.map(client => {
        const { [columnKey]: removed, ...rest } = client
        return rest
      })
      setClients(updatedClients)
      
      setContextMenu({ visible: false, x: 0, y: 0, column: null })
      toast.success('Column deleted')
    }
  }

  const changeColumnType = (columnKey, newType) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, type: newType } : col
    )
    setColumns(updatedColumns)
    setContextMenu({ visible: false, x: 0, y: 0, column: null })
    toast.success('Column type changed')
  }

  const adjustColumnWidth = (columnKey, newWidth) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, width: Math.max(50, Math.min(500, newWidth)) } : col
    )
    setColumns(updatedColumns)
    toast.success('Column width adjusted')
  }

  const clearColumnData = (columnKey) => {
    if (window.confirm('Are you sure you want to clear all data in this column?')) {
      const updatedClients = clients.map(client => ({ ...client, [columnKey]: '' }))
      setClients(updatedClients)
      setContextMenu({ visible: false, x: 0, y: 0, column: null })
      toast.success('Column data cleared')
    }
  }

  const showAllColumns = () => {
    const updatedColumns = columns.map(col => ({ ...col, visible: true }))
    setColumns(updatedColumns)
    setContextMenu({ visible: false, x: 0, y: 0, column: null })
    toast.success('All columns shown')
  }

  const renderCell = (client, column, rowIndex) => {
    const cellId = `${rowIndex}-${column.key}`
    const isSelected = selectedCell === cellId
    const isEditing = editingCell === cellId
    const value = client[column.key]

    return (
      <td
        key={column.key}
        className={`sheets-cell ${
          isSelected ? 'selected' : ''
        } ${
          isEditing ? 'editing' : ''
        } ${
          column.frozen ? 'column-frozen' : ''
        }`}
        style={{ width: column.width }}
        onClick={() => handleCellClick(rowIndex, column.key)}
        onDoubleClick={() => startEditing(rowIndex, column.key)}
      >
        {isEditing ? (
          column.type === 'select' ? (
            <select
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={stopEditing}
              onKeyDown={(e) => {
                if (e.key === 'Enter') stopEditing()
                if (e.key === 'Escape') {
                  setEditingCell(null)
                  setEditValue('')
                }
              }}
              className="w-full bg-transparent border-none outline-none"
            >
              {column.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              ref={inputRef}
              type={column.type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={stopEditing}
              onKeyDown={(e) => {
                if (e.key === 'Enter') stopEditing()
                if (e.key === 'Escape') {
                  setEditingCell(null)
                  setEditValue('')
                }
              }}
              className="w-full bg-transparent border-none outline-none"
            />
          )
        ) : (
          <span>
            {column.type === 'number' && column.key === 'value' 
              ? `$${Number(value).toLocaleString()}` 
              : String(value || '')
            }
          </span>
        )}
      </td>
    )
  }



  const handleKeyDown = (e) => {
    if (!selectedCell) return

    const [rowIndex, columnKey] = selectedCell.split('-')
    const currentRowIndex = parseInt(rowIndex)
    const currentColumnIndex = columns.findIndex(col => col.key === columnKey)

    switch (e.key) {
      case 'Enter':
        if (editingCell) {
          stopEditing()
        } else {
          startEditing(currentRowIndex, columnKey)
        }
        break
      case 'Escape':
        if (editingCell) {
          setEditingCell(null)
          setEditValue('')
        }
        break
      case 'ArrowUp':
        if (!editingCell && currentRowIndex > 0) {
          setSelectedCell(`${currentRowIndex - 1}-${columnKey}`)
        }
        break
      case 'ArrowDown':
        if (!editingCell && currentRowIndex < filteredClients.length - 1) {
          setSelectedCell(`${currentRowIndex + 1}-${columnKey}`)
        }
        break
      case 'ArrowLeft':
        if (!editingCell && currentColumnIndex > 0) {
          setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex - 1].key}`)
        }
        break
      case 'ArrowRight':
        if (!editingCell && currentColumnIndex < columns.length - 1) {
          setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex + 1].key}`)
        }
        break
      case 'Tab':
        e.preventDefault()
        if (editingCell) {
          stopEditing()
        }
        if (e.shiftKey) {
          if (currentColumnIndex > 0) {
            setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex - 1].key}`)
          }
        } else {
          if (currentColumnIndex < columns.length - 1) {
            setSelectedCell(`${currentRowIndex}-${columns[currentColumnIndex + 1].key}`)
          }
        }
        break
    }
  }

  const addNewRow = () => {
    const newClient = {
      id: Math.max(...clients.map(c => c.id)) + 1,
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      status: 'Prospect',
      industry: '',
      projects: 0,
      lastContact: new Date().toISOString().split('T')[0],
      value: 0,
      notes: ''
    }
    
    setClients([...clients, newClient])
    toast.success('New row added')
  }

  const deleteSelectedRows = () => {
    if (selectedRows.size === 0) {
      toast.warning('No rows selected')
      return
    }

    if (window.confirm(`Are you sure you want to delete ${selectedRows.size} row(s)?`)) {
      const updatedClients = clients.filter(client => !selectedRows.has(client.id))
      setClients(updatedClients)
      setSelectedRows(new Set())
      toast.success(`${selectedRows.size} row(s) deleted successfully`)
    }
  }

  const toggleRowSelection = (clientId) => {
    const newSelection = new Set(selectedRows)
    if (newSelection.has(clientId)) {
      newSelection.delete(clientId)
    } else {
      newSelection.add(clientId)
    }
    setSelectedRows(newSelection)
  }

  const selectAllRows = () => {
    if (selectedRows.size === filteredClients.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredClients.map(client => client.id)))
    }
  }

  const exportToCSV = () => {
    const headers = columns.map(col => col.label).join(',')
    const rows = filteredClients.map(client => 
      columns.map(col => {
        const value = client[col.key]
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      }).join(',')
    )
    
    const csvContent = [headers, ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'clients.csv'
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success('Data exported successfully')
  }

  // Column Context Menu Component
  const ColumnContextMenu = () => {
    if (!contextMenu.visible || !contextMenu.column) return null

    const column = contextMenu.column
    const hiddenColumnsCount = columns.filter(col => !col.visible).length

    return (
      <div
        ref={contextMenuRef}
        className="context-menu"
        style={{
          left: contextMenu.x,
          top: contextMenu.y
        }}
      >
        <button
          className="context-menu-item"
          onClick={() => handleSort(column.key, 'asc')}
        >
          <ApperIcon name="ArrowUp" className="h-4 w-4" />
          Sort Ascending
        </button>
        <button
          className="context-menu-item"
          onClick={() => handleSort(column.key, 'desc')}
        >
          <ApperIcon name="ArrowDown" className="h-4 w-4" />
          Sort Descending
        </button>
        
        <div className="context-menu-separator" />
        
        <button
          className="context-menu-item"
          onClick={() => toggleColumnVisibility(column.key)}
        >
          <ApperIcon name={column.visible ? "EyeOff" : "Eye"} className="h-4 w-4" />
          {column.visible ? 'Hide Column' : 'Show Column'}
        </button>
        
        <button
          className="context-menu-item"
          onClick={() => toggleColumnFreeze(column.key)}
        >
          <ApperIcon name={column.frozen ? "Unlock" : "Lock"} className="h-4 w-4" />
          {column.frozen ? 'Unfreeze Column' : 'Freeze Column'}
        </button>
        
        {hiddenColumnsCount > 0 && (
          <button
            className="context-menu-item"
            onClick={showAllColumns}
          >
            <ApperIcon name="Eye" className="h-4 w-4" />
            Show All Columns ({hiddenColumnsCount} hidden)
          </button>
        )}
        
        <div className="context-menu-separator" />
        
        <button
          className="context-menu-item"
          onClick={() => insertColumn(column.key, 'before')}
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          Insert Column Before
        </button>
        
        <button
          className="context-menu-item"
          onClick={() => insertColumn(column.key, 'after')}
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          Insert Column After
        </button>
        
        <div className="context-menu-separator" />
        
        <div className="context-menu-submenu">
          <button className="context-menu-item">
            <ApperIcon name="Type" className="h-4 w-4" />
            Change Type ▶
          </button>
          <div className="context-menu-submenu-content">
            {['text', 'email', 'tel', 'url', 'number', 'date', 'select'].map(type => (
              <button
                key={type}
                className="context-menu-item"
                onClick={() => changeColumnType(column.key, type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="context-menu-submenu">
          <button className="context-menu-item">
            <ApperIcon name="Move" className="h-4 w-4" />
            Adjust Width ▶
          </button>
          <div className="context-menu-submenu-content">
            <div className="p-2">
              <input
                type="number"
                className="column-width-input"
                value={column.width}
                onChange={(e) => adjustColumnWidth(column.key, parseInt(e.target.value))}
                min="50"
                max="500"
                placeholder="Width"
              />
            </div>
            <button
              className="context-menu-item"
              onClick={() => adjustColumnWidth(column.key, 150)}
            >
              Default (150px)
            </button>
            <button
              className="context-menu-item"
              onClick={() => adjustColumnWidth(column.key, 200)}
            >
              Wide (200px)
            </button>
            <button
              className="context-menu-item"
              onClick={() => adjustColumnWidth(column.key, 300)}
            >
              Extra Wide (300px)
            </button>
          </div>
        </div>
        
        <div className="context-menu-separator" />
        
        <button
          className="context-menu-item"
          onClick={() => clearColumnData(column.key)}
        >
          <ApperIcon name="Eraser" className="h-4 w-4" />
          Clear Column Data
        </button>
        
        <button
          className="context-menu-item danger"
          onClick={() => deleteColumn(column.key)}
          disabled={columns.length <= 1}
        >
          <ApperIcon name="Trash2" className="h-4 w-4" />
          Delete Column
        </button>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft border border-surface-200 dark:border-surface-700 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-200 dark:border-surface-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                  Clients Management
                </h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">
                  Manage your clients with a spreadsheet-like interface
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="prospect">Prospect</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="sheets-toolbar">
            <button onClick={addNewRow} className="primary">
              <ApperIcon name="Plus" className="h-4 w-4" />
              Add Row
            </button>
            
            <button 
              onClick={deleteSelectedRows} 
              className="danger"
              disabled={selectedRows.size === 0}
            >
              <ApperIcon name="Trash2" className="h-4 w-4" />
              Delete Selected ({selectedRows.size})
            </button>
            
            <button onClick={selectAllRows}>
              <ApperIcon name="CheckSquare" className="h-4 w-4" />
              {selectedRows.size === filteredClients.length ? 'Deselect All' : 'Select All'}
            </button>
            
            <button onClick={exportToCSV}>
              <ApperIcon name="Download" className="h-4 w-4" />
              Export CSV
            </button>
            
            <div className="text-sm text-surface-500 dark:text-surface-400 ml-auto">
              {filteredClients.length} of {clients.length} clients
            </div>
          </div>

          {/* Spreadsheet */}
          <div className="sheets-container" ref={containerRef}>
            <table className="sheets-table w-full">
              <thead>
                <tr>
                  <th className="sheets-header" style={{ width: 50 }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.size > 0 && selectedRows.size === filteredClients.length}
                      onChange={selectAllRows}
                      className="rounded"
                    />
                  </th>
                  {visibleColumns.map((column) => (
                    <th


                      key={column.key} 
                      className={`sheets-header ${
                        column.frozen ? 'column-frozen' : ''
                      } ${
                        sortColumn === column.key ? `column-sorted-${sortDirection}` : ''
                      }`}
                      style={{ width: column.width }}
                      onContextMenu={(e) => handleColumnRightClick(e, column)}
                    >
                      {column.label}
                      <div 
                        className="column-resize-handle"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          const startX = e.clientX
                          const startWidth = column.width
                          
                          const handleMouseMove = (e) => {
                            const newWidth = startWidth + (e.clientX - startX)
                            adjustColumnWidth(column.key, newWidth)
                          }
                          
                          const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove)
                            document.removeEventListener('mouseup', handleMouseUp)
                          }
                          
                          document.addEventListener('mousemove', handleMouseMove)
                          document.addEventListener('mouseup', handleMouseUp)
                        }}
                      />
                    </th>
                  ))}

                </tr>
              </thead>
              <tbody>
                {finalClients.map((client, rowIndex) => (


                  <tr 
                    key={client.id}
                    className={selectedRows.has(client.id) ? 'row-selected' : ''}
                  >
                    <td className="sheets-row-number">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(client.id)}
                        onChange={() => toggleRowSelection(client.id)}
                        className="rounded"
                      />
                    </td>
                    {visibleColumns.map((column) => renderCell(client, column, rowIndex))}
                  </tr>
                ))
              </tbody>
            </table>
          </div>


          {finalClients.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="Users" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
              <p className="text-surface-500 dark:text-surface-400">
                {searchTerm || filterStatus !== 'all' 
                  ? 'No clients match your search criteria' 
                  : 'No clients found. Add your first client to get started.'
                }
              </p>
            </div>
          )}

          {/* Context Menu */}
          <ColumnContextMenu />

          {/* Instructions */}
          <div className="p-4 bg-surface-50 dark:bg-surface-700 border-t border-surface-200 dark:border-surface-600">
            <div className="text-sm text-surface-600 dark:text-surface-300 space-y-1">
              <p><strong>Tips:</strong> Click a cell to select, click again to edit. Right-click column headers for options. Use arrow keys to navigate.</p>
              <p><strong>Keyboard shortcuts:</strong> Enter to edit/save, Escape to cancel, Tab/Shift+Tab to navigate</p>
              <p><strong>Column operations:</strong> Right-click any column header to sort, hide, freeze, or manage columns</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Clients
