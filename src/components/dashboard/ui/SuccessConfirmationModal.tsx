import CloseBtn from '@/components/common/Navigation/CloseBtn'
import ModalLayout from '@/layouts/ModalLayout'
import { SuccessStep } from '../merchant/WithdrawModal'

interface SuccessConfirmationModalProps {
  boldTitle?: string;
  onClose: () => void;
  maxWidth?:string;
  message?: string;
  title?: string;
}

const SuccessConfirmationModal = ({ boldTitle,title,message ,onClose,maxWidth="max-w-md" }: SuccessConfirmationModalProps) => {
  return (
    <>
     <ModalLayout onClose={onClose} maxWidth={maxWidth}>
          <div className="relative px-5 pt-5 pb-6">
            <CloseBtn onClose={onClose} />
            <SuccessStep
              title={title}
              message={
                <>
                  <span className="font-bold">{boldTitle}</span> {message}
                </>
              }
              onContinue={onClose}
            />
          </div>
        </ModalLayout>
    </>
  )
}

export default SuccessConfirmationModal