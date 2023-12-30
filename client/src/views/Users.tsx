import React from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Separator } from 'components/ui/separator.tsx'
import { trpc } from 'lib/trpc.ts'
import { Plus, User } from 'lucide-react'

const Users = () => {
  const [name, setName] = React.useState('')
  const utils = trpc.useUtils()
  const users = trpc.userList.useQuery()
  const userCreator = trpc.userCreate.useMutation()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const addUser = async () => {
    userCreator.mutate({
      name: name ?? 'John Doe'
    })
    await utils.userList.invalidate()
  }

  return (
    <div>
      {users.data?.map(user => <div key={user.id}>{user.name}</div>)}
      <Separator />
      <Input onChange={handleNameChange} />
      <Button onClick={addUser} disabled={userCreator.isLoading}>
        <User />
        <Plus />
      </Button>
    </div>
  )
}

export default Users
