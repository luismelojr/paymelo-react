<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dash\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function show()
    {
        $notification = auth()->user()->notification;

        return Inertia::render('Dash/Notification/Index', [
            'notification' => new NotificationResource($notification),
        ]);
    }

    public function update(Notification $notification, Request $request)
    {
        $data = $request->validate([
            'notify_payment' => 'nullable|boolean',
            'notify_email' => 'nullable|boolean',
            'notify_whatsapp' => 'nullable|boolean',
        ]);

        $notification->update($data);

        return redirect()->route('notification.show')->toast('Notificação atualizada com sucesso!');
    }
}
