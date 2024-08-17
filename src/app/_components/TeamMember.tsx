interface TeamMemberProps {
  snappyRole: string
  members: string
}

function TeamMember({ snappyRole, members }: TeamMemberProps) {
  return (
    <div className="flex justify-between w-[45%] text-sm">
      <p>{snappyRole}</p>
      <p>{members}</p>
    </div>
  )
}

export default TeamMember
