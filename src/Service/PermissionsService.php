<?php

namespace App\Service;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Entity\Permissions;


use Doctrine\Persistence\ManagerRegistry;

class PermissionsService
{

    public function serializeData($data) {
        $normalizers = [new ObjectNormalizer()];
        $encoders = [new JsonEncoder()];
        $serializer = new Serializer($normalizers, $encoders);

        $jsonContent = $serializer->serialize($data, 'json');

        return $jsonContent;
    }



    public function getAllPermissionsForUsers(ManagerRegistry $doctrine) {

        $permissions = $doctrine->getRepository(Permissions::class)->findAll();
        $serializedPermissions = $this->serializeData($permissions);
        return $serializedPermissions;
    }
}