function MeetingInfo() {
  return (
    <>
      <div className="w-12 h-12 bg-slate-300 rounded-full" />
      <h1>모임 이름</h1>
      <div>여기는 모임 설명을 쓰는 자리입니다.</div>
      <div>여기는 모임 설명을 쓰는 자리입니다.</div>
      <div>yyyy.mm.dd - yyyy.mm.dd</div>
      <button
        type="button"
        className="bg-black rounded-full text-white px-4 py-2"
      >
        우리 모임에 맞는 미션을 등록해보세요
      </button>
      <div>참여자 정보 (00명)</div>
      <hr />
      <div>
        <div className="flex justify-between">
          <div>방장</div>
          <div>10/10</div>
        </div>
        <div className="flex justify-between">
          <div>참여자 1</div>
          <div>10/10</div>
        </div>
        <div className="flex justify-between">
          <div>참여자 2</div>
          <div>10/10</div>
        </div>
      </div>
    </>
  )
}

export default MeetingInfo
