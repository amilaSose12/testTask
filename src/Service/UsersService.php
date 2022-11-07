<?php

namespace App\Service;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Entity\Users;

use Doctrine\ORM\Tools\Pagination\Paginator;

use Doctrine\Persistence\ManagerRegistry;

class UsersService
{
    public function serializeData($data) {
        $normalizers = [new ObjectNormalizer()];
        $encoders = [new JsonEncoder()];
        $serializer = new Serializer($normalizers, $encoders);

        $jsonContent = $serializer->serialize($data, 'json');

        return $jsonContent;
    }


    public static function paginateFromQuery($query, $pageSize = 10, $currentPage = 1)
    {
        if ($pageSize < 1) {
            $pageSize = 1;
        }

        if ($currentPage < 1) {
            $currentPage = 1;
        }

        $paginator = new Paginator($query);
        $results = $paginator
            ->getQuery()
            ->setFirstResult($pageSize * ($currentPage - 1))
            ->setMaxResults($pageSize)
            ->getResult();

        return $results;
    }

    public function getAllUsers($page = 1, ManagerRegistry $doctrine) {

        $usersQuery = $doctrine->getRepository(Users::class)->getAllUsersQuery();

        $totalPages = ceil(count($usersQuery->getResult())/10);
        $users = $this->paginateFromQuery($usersQuery, 10, $page);
        $serializedUsers = $this->serializeData($users);

        return $serializedUsers;
    }

    public function getUserById($userId, ManagerRegistry $doctrine) {

        $users = $doctrine->getRepository(Users::class)->findOneBy(['id' => $userId]);
        $serializedUsers = $this->serializeData($users);

        return $serializedUsers;
    }

    public function updateUserData($parameters, ManagerRegistry $doctrine) {

        $usersRepository = $doctrine->getRepository(Users::class);
        $user = $usersRepository->findOneBy(['id' => $parameters['id']]);

        $user->setFirstName($parameters['firstName']);
        $user->setLastName($parameters['lastName']);
        $user->setUsername($parameters['username']);
        $user->setPassword($parameters['password']);
        $user->setEmail($parameters['email']);
        $user->setStatus($parameters['status']);

        $usersRepository->save($user, true);

        return $this->serializeData($user);
    }

    public function createNewUser($parameters, ManagerRegistry $doctrine) {

        $usersRepository = $doctrine->getRepository(Users::class);

        $user = new Users();

        $user->setFirstName($parameters['firstName']);
        $user->setLastName($parameters['lastName']);
        $user->setUsername($parameters['username']);
        $user->setPassword($parameters['password']);
        $user->setEmail($parameters['email']);
        $user->setStatus($parameters['status']);
        $user->setPermissions(1);

        $usersRepository->save($user, true);

        return $this->serializeData($user);
    }

    public function deleteUserAction($userId, ManagerRegistry $doctrine) {

        $user = $doctrine->getRepository(Users::class)->findOneBy(['id' => $userId]);
        $users = $doctrine->getRepository(Users::class)->remove($user, true);

        return true;
    }

    public function getFilteredUsers($filterWord, $status, $page=1, ManagerRegistry $doctrine) {

        if($filterWord == 'not_set') {
            $filterWord = '';
        }
        if($status == 'not_set') {
            $status = '';
        }

        $users = $doctrine->getRepository(Users::class)->getFilteredUsers($filterWord, $status);

        $totalPages = ceil(count($users->getResult())/10);
        $users = $this->paginateFromQuery($users, 10, $page);
        $serializedUsers = $this->serializeData($users);
      

        return $serializedUsers;
    }

    public function getFilteredUsersPerStatus($status, ManagerRegistry $doctrine) {

        $users = $doctrine->getRepository(Users::class)->getFilteredUsersPerStatus($status);
        $serializedUsers = $this->serializeData($users);

        return $serializedUsers;
    }

    public function getAllPermissionsForUsers(ManagerRegistry $doctrine) {

        $permissions = $doctrine->getRepository(Permissions::class)->findAll();
        $serializedPermissions = $this->serializeData($permissions);

        return $serializedPermissions;
    }

    public function changePermissionForUser($parameters, $doctrine) {
        $usersRepository = $doctrine->getRepository(Users::class);

        $user = $usersRepository->findOneBy(['id' => $parameters['userId']]);
        $user->setPermissions($parameters['code']);
        
        $usersRepository->save($user, true);

        return $this->serializeData($user);

    }
}

