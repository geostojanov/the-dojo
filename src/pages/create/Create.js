import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

// styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  
  const { documents } = useCollection('users')
  const [users, setUsers ] = useState([])
  const { user } = useAuthContext()
  
  // form fields
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  
  useEffect(() => {
    if(documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    
    if(!category) {
      setFormError('Please select a project category')
      return
    }
    if(assignedUsers.length < 1) {
      setFormError('Please assign the project to at least one user')
      return
    }
    
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    
    const assignedUsersList = assignedUsers.map(user => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })
    
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }
    
    await addDocument(project)
    if(!response.error) {
      history.push('/')
    }
  }
  
  return (
    <div className='create-form'>   
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select 
            onChange={option => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)} 
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}