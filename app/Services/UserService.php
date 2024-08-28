<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function __construct(
        private User $user
    ) {
    }
    public function create(array $data): User
    {
        $user = $this->user->create($data);
        $user->config()->create();
        return $user;
    }

    /**
     * Get user by google id
     *
     * @param string $id
     * @return User|null
     */
    public function findUserByGoogleId(string $id): ?User
    {
        return $this->user->where('google_id', $id)->first();
    }

    /**
     * Get user by email
     * @param string $email
     * @return User|null
     */
    public function findUserByEmail(string $email): ?User
    {
        return $this->user->where('email', $email)->first();
    }

    /**
     * Login user with google
     * @param array $data
     * @return User
     */
    public function loginUserWithGoogle(array $data): User
    {
        $findUser = $this->findUserByGoogleId($data['google_id']);

        if ($findUser) {
            return $findUser;
        }

        $findUserEmail = $this->findUserByEmail($data['email']);

        if ($findUserEmail) {
            $findUserEmail->update(['google_id' => $data['google_id']]);
            return $findUserEmail;
        }

        return $this->create($data);
    }
}
