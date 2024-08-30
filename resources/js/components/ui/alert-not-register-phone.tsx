import { Link } from '@inertiajs/react'

export default function AlertNotRegisterPhone() {
  return (
    <div className={'w-full p-2'}>
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 flex items-center justify-between">
              Cadastre seu número de telefone para receber notificações por
              WhatsApp.
            </p>
            <Link
              href={route('profile.show')}
              className="font-medium text-yellow-700 underline hover:text-yellow-600 "
            >
              Adicionar número de telefone
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
