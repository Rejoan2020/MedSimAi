import React from 'react'

export default function Footer() {
  return (
    <div className='border-1 border-[#F0F4FE] rounded-xl p-4'>
      <div className='text-[#2536A8] font-medium text-[20px] py-4'>Learning Path Details</div>
      <div className='w-full border border-t border-[#F0F4FE]'></div>
      <div className='py-4'>
        <div>Description</div>
        <div className='text-Secondary-Text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut adipisci fugit excepturi ullam obcaecati sint amet ducimus, officia nostrum consectetur magni vero dolore? Deleniti, voluptatibus aperiam iusto eum impedit animi.</div>
      </div>
      <div className='py-4 grid grid-cols-4 lg:grid-cols-8'>
        <div>
          <div>Category</div>
          <div className='text-Secondary-Text'>Neurology</div>
        </div>
        <div>
          <div>Total Classes</div>
          <div className='text-Secondary-Text'>3</div>
        </div>
        <div>
          <div>Duration</div>
          <div className='text-Secondary-Text'>5 hours</div>
        </div>
        <div>
          <div>Status</div>
          <div className='text-Secondary-Text'>Published</div>
        </div>
      </div>
    </div>
  )
}
