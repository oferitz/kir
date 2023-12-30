import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card'
import { Input } from 'components/ui/input'
import { ScrollArea } from 'components/ui/scroll-area'
import { Separator } from 'components/ui/separator'
import { trpc } from 'lib/trpc.ts'

const Users = () => {
  const [name, setName] = React.useState('')
  const utils = trpc.useUtils()
  const users = trpc.userList.useQuery()
  const userCreator = trpc.userCreate.useMutation()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const addUser = async () => {
    userCreator.mutate(
      {
        name: name ?? 'John Doe'
      },
      {
        onSuccess() {
          utils.userList.invalidate()
        }
      }
    )
  }

  return (
    <div className="mt-4 w-1/4">
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Invite your team members to collaborate.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex space-x-2">
            <Input value={name} onChange={handleNameChange} />
            <Button variant="secondary" className="shrink-0" onClick={addUser}>
              Add User
            </Button>
          </div>
          <Separator className="my-4" />
          <ScrollArea>
            <div className="h-96">
              {users.data?.map((user, i) => (
                <div key={user.id} className="flex items-center justify-between space-x-4 h-16">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">m@example.com</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default Users
