<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{

    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
	
    public function load(ObjectManager $manager)
    {
        $user = new User();
	$user->setEmail('admin@admin');
	$encodedPassword = $this->passwordEncoder->encodePassword($user, 'test');
        $user->setPassword($encodedPassword);
	$user->setRoles(['ROLE_USER']);

        $manager->persist($user);
        $manager->flush();
    }
}
